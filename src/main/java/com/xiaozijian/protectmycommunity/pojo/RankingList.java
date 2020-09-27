package com.xiaozijian.protectmycommunity.pojo;

import java.sql.Timestamp;

public class RankingList {
    private Integer id;
    private String listName;
    private String playerName;
    private Integer passTime;
    private Integer score;
    private Timestamp time;
    private String passTimeString;

    @Override
    public String toString() {
        return "RankingList{" +
                "id=" + id +
                ", listName='" + listName + '\'' +
                ", playerName='" + playerName + '\'' +
                ", passTime=" + passTime +
                ", score=" + score +
                ", time=" + time +
                ", passTimeString='" + passTimeString + '\'' +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getListName() {
        return listName;
    }

    public void setListName(String listName) {
        this.listName = listName;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public Integer getPassTime() {
        return passTime;
    }

    public void setPassTime(Integer passTime) {
        this.passTime = passTime;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

    public String getPassTimeString() {
        return passTimeString;
    }

    public void setPassTimeString(String passTimeString) {
        this.passTimeString = passTimeString;
    }

    public RankingList(Integer id, String listName, String playerName, Integer passTime, Integer score, Timestamp time, String passTimeString) {
        this.id = id;
        this.listName = listName;
        this.playerName = playerName;
        this.passTime = passTime;
        this.score = score;
        this.time = time;
        this.passTimeString = passTimeString;
    }
}
