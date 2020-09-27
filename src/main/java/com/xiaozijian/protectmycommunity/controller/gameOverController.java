package com.xiaozijian.protectmycommunity.controller;

import com.xiaozijian.protectmycommunity.mapper.RankingListMapper;
import com.xiaozijian.protectmycommunity.mapper.WordlistVocabulary;
import com.xiaozijian.protectmycommunity.mapper.Wordlist_nameMapper;
import com.xiaozijian.protectmycommunity.utils.Date2TimeStamp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import java.sql.Timestamp;
import java.util.Date;

@Controller
public class gameOverController {
    @Autowired
    Wordlist_nameMapper wordlist_nameMapper;

    @Autowired
    WordlistVocabulary wordlistVocabulary;

    @Autowired
    RankingListMapper rankingListMapper;


    /**
     * This function will handle the request from "Defeated state" of "Victory state", the information
     * includes the pass time, player's name, play time, and score will be stored in database.The redirect
     * to main page or restart the game according to player's request.
     *
     * @author Xiao Zijian
     * @param listName
     * @param playerName
     * @param playerScore
     * @param winOrLose
     * @param nextAction
     * @param passTime
     * @param passTimeString
     * @param model
     * @return
     */
    @PostMapping("/gameOver")
    public String gameOverAction(@RequestParam("listName") String listName,
                                 @RequestParam("playerName") String playerName,
                                 @RequestParam("playerScore") Integer playerScore,
                                 @RequestParam("winOrLose") String winOrLose,
                                 @RequestParam("next") String nextAction,
                                 @RequestParam("passTime") Integer passTime,
                                 @RequestParam("passTimeString") String passTimeString,
                                 Model model){
        System.out.println(playerName.equals("Please type your name.."));
           Integer score=playerScore;
            Integer passTimeInt=passTime;
            Timestamp timestamp=null;
        System.out.println(passTime+":::"+passTimeString);
           //store player's score
        if(!playerName.equals("Please type your name..") && !playerName.isEmpty()){
            System.out.println("enter");
            try {
                timestamp=Date2TimeStamp.date2timeStamp(new Date());
            }catch (Exception e){
                e.printStackTrace();
            }
          // Timestamp timestamp=new Timestamp();
          rankingListMapper.insertRankingEntry(listName,playerName,passTimeInt,score,timestamp,passTimeString);
        }

        //new action, to the 'mainPage' or 'try again';
       if(nextAction.equals("tryAgain")){
           model.addAttribute("listName",listName);
           return "index";
       }else{
           return "redirect:/hello";
       }

    }
}
