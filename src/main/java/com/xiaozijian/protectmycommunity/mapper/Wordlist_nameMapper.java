package com.xiaozijian.protectmycommunity.mapper;

import com.xiaozijian.protectmycommunity.pojo.Wordlist_name;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.Collection;

/**
 *  This is the data access object for connecting the service with 'wordlist_name' database,
 *  create,retrieve,update,delete actions will be operated in this class.
 *
 * @author Xiao zijian
 */
@Repository
@Mapper
public interface Wordlist_nameMapper {
    @Select("select * from wordlist_name")
    public Collection<Wordlist_name> getAllEntries();

    @Delete("delete from wordlist_name where wname=#{wordListName}")
    public boolean deleteWordListName(String wordListName);

    //insert into word_vocabulary (wordListName,word,hword) values (#{wordListName},#{word},#{hword})
    @Insert("insert into wordlist_name (wname,wauthor) values (#{wname},#{wauthor})")
    public boolean insertNewWordList(String wname, String wauthor);
}
