package com.xiaozijian.protectmycommunity.controller;

import com.xiaozijian.protectmycommunity.mapper.RankingListMapper;
import com.xiaozijian.protectmycommunity.mapper.WordlistVocabulary;
import com.xiaozijian.protectmycommunity.mapper.Wordlist_nameMapper;
import com.xiaozijian.protectmycommunity.pojo.HyphenationWord;
import com.xiaozijian.protectmycommunity.pojo.Wordlist_name;
import com.xiaozijian.protectmycommunity.utils.cacheHandler.CacheHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ShowListPageController {
    @Autowired
    WordlistVocabulary wordlistVocabulary;
    @Autowired
    Wordlist_nameMapper wordlist_nameMapper;

    @Autowired
    RankingListMapper rankingListMapper;

    @Autowired
    CacheHandler cacheHandler;


    /**
     * Handle the request from showList Page,
     * retrieve the corresponding word list entries from database and return.
     * @param wname
     * @param model
     * @return
     */
    @GetMapping("/showListPage/{wname}")
    public String toCheckListPage(@PathVariable("wname")String wname, Model model){
       // System.out.println("enter");
        model.addAttribute("wordList", wordlistVocabulary.getAllWords(wname));
        model.addAttribute("title",wname);
        cacheHandler.updateCache(wname);
        System.out.println("Flush the cache memory");
        return "showList/showEachListPage";
    }

    /**
     * Add a new word entry.
     * @param hyphenationWord
     * @return
     */
    @PostMapping("/showListPage/wordAction")
    public String addNewWord(HyphenationWord hyphenationWord){
        String wordListName=hyphenationWord.getWordListName();
        String word=hyphenationWord.getWord();
        String hword=hyphenationWord.getHword();
        wordlistVocabulary.insertWord(wordListName,word,hword);
        return "redirect:/showListPage/"+wordListName;
    }

    /**
     * Delete a word entry
     * @param wid
     * @return
     */
    @GetMapping("/showListPage/delete/{wid}")
    public String deleteWord(@PathVariable("wid")Integer wid){
       HyphenationWord hyphenationWord=wordlistVocabulary.getWordListNameByWid(wid);
       String wordListName=hyphenationWord.getWordListName();
       System.out.println(wordlistVocabulary.deleteWord(wid));
        return "redirect:/showListPage/"+wordListName;
    }

    /**
     * Delete a word list according to player's selection and refresh the page.
     * @param wordListName
     * @param model
     * @return
     */
    @GetMapping("/showListPage/deleteList/{wordListName}")
    public String deleteList(@PathVariable("wordListName") String wordListName,Model model){
        System.out.println(wordlistVocabulary.deleteList(wordListName));
        System.out.println(wordlist_nameMapper.deleteWordListName(wordListName));
        System.out.println(rankingListMapper.deleteRankingList(wordListName));
        model.addAttribute("wordListNames", wordlist_nameMapper.getAllEntries());
        model.addAttribute("title","Vocabulary List");
        return "showList/showListPage";
    }

    /**
     * Update a word entry, jump to word update page, and store the corresponding word entry at model.
     * @param wid
     * @param model
     * @return
     */
    @GetMapping("/showListPage/update/{wid}")
    public String toUpdatePage(@PathVariable("wid") Integer wid,Model model){
        HyphenationWord word=wordlistVocabulary.getWordListNameByWid(wid);
        model.addAttribute("hyphenatedWord",word);
        model.addAttribute("wordListName",word.getWordListName());
        return "showList/wordUpdatePage";
    }

    /**
     * Update the word entry.
     * @param wid
     * @param hyphenationWord
     * @return
     */
    @PostMapping("/showListPage/update/{wid}")
    public String doUpdatePage(@PathVariable("wid") Integer wid,HyphenationWord hyphenationWord){
        String wordListName=hyphenationWord.getWordListName();
        String word=hyphenationWord.getWord();
        String hword=hyphenationWord.getHword();
        Integer id=hyphenationWord.getWid();
        System.out.println(hyphenationWord.toString());
        System.out.println(wordlistVocabulary.UpdateWord(word, hword, wid));
        return "redirect:/showListPage/"+wordListName;
    }

    /**
     * Create a new word list, and jump to the word list page.
     * @param wordlist_name
     * @param model
     * @return
     */
    @PostMapping("/showListPage/addNewList")
    public String toAddNewListPage(Wordlist_name wordlist_name,Model model){
        System.out.println(wordlist_name.toString());
        String wname=wordlist_name.getWname();
        String wauthor=wordlist_name.getWauthor();
        wordlist_nameMapper.insertNewWordList(wname,wauthor);
        ModelAndView mav=new ModelAndView("/showListPage/"+wname);
        return "redirect:/showListPage/"+wname;
    }

}
