package com.xiaozijian.protectmycommunity.controller;

import com.xiaozijian.protectmycommunity.mapper.RankingListMapper;
import com.xiaozijian.protectmycommunity.mapper.WordlistVocabulary;
import com.xiaozijian.protectmycommunity.mapper.Wordlist_nameMapper;
import com.xiaozijian.protectmycommunity.pojo.RankingList;
import com.xiaozijian.protectmycommunity.utils.cacheHandler.CacheHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.websocket.server.PathParam;
import java.util.*;

@Controller
public class MainPageController {

    @Autowired
    CacheHandler cacheHandler;

    @Autowired
    Wordlist_nameMapper wordlist_nameMapper;

    @Autowired
    WordlistVocabulary wordlistVocabulary;

    @Autowired
    RankingListMapper rankingListMapper;

    /**
     * Handle the request when player enter into main page
     * The word list names and ranking list names will be retrieved from database and send to front-end page.
     * @author Xiao Zijian
     * @param model
     * @return
     */
    @RequestMapping("/hello")
    public String mainPage(Model model){
    System.out.println(new Date().toString());
    //System.out.println("test");
        model.addAttribute("names", wordlist_nameMapper.getAllEntries());
        System.out.println(rankingListMapper.getRankingListNames().toString());
       model.addAttribute("rankingListNames",rankingListMapper.getRankingListNames());
        return "testPage";
    }

    /**
     * Handle the request when the "start game" button was clicked. It will check whether a word list was selected,
     * if not, a error message will be returned and display at main page.
     * @author Xiao Zijian
     * @param listName
     * @param model
     * @return
     */
    @RequestMapping("/startGame")
    public String startGame(@PathParam("listName") String listName,Model model) {
        System.out.println(listName);
        if(listName.equals("default")){
            model.addAttribute("msgGame","Please select a word list");
            return "forward:/hello";
        }else{
//            Collection<HyphenationWord> wordList= wordlistVocabulary.getAllWords(listName);
//            System.out.println(wordList.size());
//            try {
//                Words2Json.words2Json(wordList);
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//            model.addAttribute("listName",listName);
            String listInJson=cacheHandler.retrieveList(listName);
            model.addAttribute("listName",listName);
            model.addAttribute("listInJson",listInJson);


            return "index";
        }
    }

    /**
     * Retrieved all word list names from database and return data to word list names page.
     * @author Xiao Zijian
     * @param model
     * @return
     */
    @RequestMapping("/showWordList")
    public String showWordList(Model model){
        model.addAttribute("wordListNames", wordlist_nameMapper.getAllEntries()); //Store the data
        model.addAttribute("title","Vocabulary List");
        return "showList/showListPage";
    }

    /**
     * Retrieved the ranking list from database according to player's selection.
     * return a error message if player do not chose a ranking list
     * @author Xiao Zijian
     * @param rankingListName
     * @param model
     * @return
     */
    @RequestMapping("/rankingList")
    public String showRankingList(@PathParam("rankingListName") String rankingListName,Model model){
    if(rankingListName.equals("default")){
        model.addAttribute("msg","Please select a ranking list");
        return "forward:/hello";
    }

    Collection<RankingList> rankingLists=rankingListMapper.getRankingListByListName(rankingListName);
    if(rankingLists.size()==0){
        return "forward:/hello";
    }else{
        for(RankingList temp:rankingLists){
            System.out.println(temp.toString());
        }
        Stack<Integer> rankNumber=new Stack<>();
        for(int i=rankingLists.size(); i>0;i--){
               rankNumber.add(i);
        }
        model.addAttribute("rankNumber",rankNumber);
        model.addAttribute("rankingListEntries",rankingLists);
        model.addAttribute("listName",rankingListName);
        return "showList/rankingPage";
    }
    }


}
