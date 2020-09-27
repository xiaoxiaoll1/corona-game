package com.xiaozijian.protectmycommunity.utils.cacheHandler;

import com.alibaba.fastjson.JSON;
import com.xiaozijian.protectmycommunity.mapper.RankingListMapper;
import com.xiaozijian.protectmycommunity.mapper.WordlistVocabulary;
import com.xiaozijian.protectmycommunity.mapper.Wordlist_nameMapper;
import com.xiaozijian.protectmycommunity.pojo.HyphenationWord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.HashMap;
import java.util.Set;

@Component
public class CacheHandler {
    @Autowired
    RedisUtil redisUtil;

    @Autowired
    StringRedisTemplate stringRedisTemplate;

    @Autowired
    Wordlist_nameMapper wordlist_nameMapper;

    @Autowired
    WordlistVocabulary wordlistVocabulary;

    @Autowired
    RankingListMapper rankingListMapper;

    public  String retrieveList(String listName){
        redisUtil.setRedisTemplate(stringRedisTemplate);
        HashMap<String,String> result=new HashMap<String,String>();
        String listJson;
        if(checkCacheExist(listName)){ //retrieve from db
            Collection<HyphenationWord> wordlist = wordlistVocabulary.getAllWords(listName);
            for (HyphenationWord wordEntry:wordlist) {
                String listNameToCache = wordEntry.getWordListName();
                String word = wordEntry.getWord().trim();
                String hword = wordEntry.getHword().trim();
                //System.out.println(word + ":" + hword);
                redisUtil.hPut(listNameToCache, word, hword);
                result.put(word, hword);
            }
        }else{ //retrieve from redis cache
            Set keys = redisUtil.hKeys(listName);
            for (Object obj : keys){
                String word=(String)obj;
                String hword=(String)redisUtil.hGet(listName,word);
               // System.out.println(word+"::"+hword);
                result.put(word,hword);
            }
        }
        listJson=JSON.toJSONString(result);
        return listJson;
    }

    /**
     * 查询单词表是否存在缓存中
     * @param listName
     * @return
     */
    private boolean checkCacheExist(String listName){
        redisUtil.setRedisTemplate(stringRedisTemplate);
        return redisUtil.hKeys(listName).isEmpty();
    }


    /**
     * update the cache
     */
    public void updateCache(String listName){
        redisUtil.setRedisTemplate(stringRedisTemplate);
        if(checkCacheExist(listName)){
            redisUtil.delete(listName);
        }
    }
}
