package com.xiaozijian.protectmycommunity;

import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ProtectmycommunityApplicationTests {
//
//    @Autowired
//    CacheHandler cacheHandler;
//
//    @Autowired
//    RedisUtil redisUtil;
//
//    @Autowired
//    StringRedisTemplate stringRedisTemplate;
//
//    @Autowired
//    WordlistVocabulary wordlistVocabulary;
//
//    @Test
//    void contextLoads() {
//    }

//
//    @Test
//    void redisTest(){
//        redisUtil.setRedisTemplate(stringRedisTemplate);
//        redisUtil.set("qmk","handsome");
//        System.out.println(redisUtil.get("qmk"));
//        redisUtil.delete("qmk");
//
//    }
//
//    //test for store the words into cache
//    @Test
//    void retrieveListFromDb(){
//        redisUtil.setRedisTemplate(stringRedisTemplate);
//        Collection<HyphenationWord> wordlist = wordlistVocabulary.getAllWords("CET4");
//        for (HyphenationWord wordEntry:wordlist){
//            String listName=wordEntry.getWordListName();
//            String word = wordEntry.getWord().trim();
//            String hword = wordEntry.getHword().trim();
//            System.out.println(word+":"+hword);
//            redisUtil.hPut(listName,word,hword);
//        }
//    }
//
//    //try to retrieve a key which dose not exist at redis cache
//    @Test
//    void retrieveNotExistKey(){
//        redisUtil.setRedisTemplate(stringRedisTemplate);
//        System.out.println(redisUtil.hKeys("CET5").isEmpty());
//    }
//
//    @Test
//    void testRerieveFromCache(){
//        HashMap<String,String> result=new HashMap<String,String>();
//       redisUtil.setRedisTemplate(stringRedisTemplate);
//       Set keys = redisUtil.hKeys("CET4");
//       for (Object obj : keys){
//           String word=(String)obj;
//           String hword=(String)redisUtil.hGet("CET4",word);
//           System.out.println(word+"::"+hword);
//            result.put(word,hword);
//       }
//        String  param= JSON.toJSONString(result);
//        System.out.println(param);
//
//    }
//
//    @Test
//    void testCompleteProcess(){
//        System.out.println(cacheHandler.retrieveList("CET4"));
//    }
//
//    @Test
//    void updateTest(){
//        redisUtil.setRedisTemplate(stringRedisTemplate);
//        cacheHandler.updateCache("CET4");
//    }

}
