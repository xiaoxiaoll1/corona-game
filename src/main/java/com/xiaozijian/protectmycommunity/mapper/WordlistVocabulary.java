package com.xiaozijian.protectmycommunity.mapper;

import com.xiaozijian.protectmycommunity.pojo.HyphenationWord;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.Collection;
/**
 *  This is the data access object for connecting the service with 'word_vocabulary' database,
 *  create,retrieve,update,delete actions will be operated in this class.
 *
 * @author Xiao zijian
 */
@Mapper
@Repository
public interface WordlistVocabulary {
    @Select("select * from word_vocabulary where wordListName=#{wname}")
    public Collection<HyphenationWord> getAllWords(String wname);

    @Insert("insert into word_vocabulary (wordListName,word,hword) values (#{wordListName},#{word},#{hword})")
    public boolean insertWord(String wordListName,String word,String hword);

    @Select("select * from word_vocabulary where wid=#{wid}")
    public HyphenationWord getWordListNameByWid(Integer wid);

    @Delete("delete from word_vocabulary where wid=#{id}")
    public boolean deleteWord(Integer id);

    @Delete("delete from word_vocabulary where wordListName=#{wordListName}")
    public boolean deleteList(String wordListName);

    @Update("update word_vocabulary set word=#{word},hword=#{hword} where wid=#{wid} ")
    public boolean UpdateWord(String word,String hword,Integer wid);

}
