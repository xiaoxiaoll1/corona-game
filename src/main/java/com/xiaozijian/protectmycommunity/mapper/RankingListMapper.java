package com.xiaozijian.protectmycommunity.mapper;

import com.xiaozijian.protectmycommunity.pojo.RankingList;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;
import java.sql.Timestamp;
import java.util.Collection;

/**
 *  This is the data access object for connecting the service with 'ranking_list' database,
 *  create,retrieve,update,delete actions will be operated in this class.
 *
 * @author Xiao Zijian
 */
@Repository
@Mapper
public interface RankingListMapper {

    /**
     * Getting the a list by list name, the result will be stored in a collection.
     * @param listName
     * @return the collection which store the entries of ranking list.
     */
    @Select("select * from ranking_list where listName=#{listName}  order by score  DESC, passTime ASC")
    public Collection<RankingList> getRankingListByListName(String listName);

    /**
     * All list names will be presented for player at the 'testPage', the result should remove duplication at first.
     *
     * @return the collection which store the entries of ranking list name
     */
    @Select("select distinct listName from ranking_list")
    public Collection<String> getRankingListNames();

    /**
     * Delete a ranking list.
     * @param listName
     * @return return true if the action is successful.
     */
    @Delete("delete from ranking_list where listName=#{listName}")
    public boolean deleteRankingList(String listName);

    /**
     * Insert one ranking entries into the ranking list database.
     * @param listName
     * @param playerName
     * @param passTime
     * @param score
     * @param time
     * @param passTimeString
     * @return
     */
    @Insert("insert into ranking_list (listName,playerName,passTime,score,time,passTimeString) values (#{listName}, #{playerName},#{passTime}, #{score},#{time},#{passTimeString})")
    public boolean insertRankingEntry( String listName, String playerName, Integer passTime, Integer score, Timestamp time,String passTimeString);
}
