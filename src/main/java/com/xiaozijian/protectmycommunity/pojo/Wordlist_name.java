package com.xiaozijian.protectmycommunity.pojo;

public class Wordlist_name {
    public Wordlist_name(String wname, String wauthor) {
        this.wname = wname;
        this.wauthor = wauthor;
    }
    public Wordlist_name(){}

    private String wname;

    @Override
    public String toString() {
        return "wordlist_name{" +
                "wname='" + wname + '\'' +
                ", wauthor='" + wauthor + '\'' +
                '}';
    }

    public void setWname(String wname) {
        this.wname = wname;
    }

    public void setWauthor(String wauthor) {
        this.wauthor = wauthor;
    }

    public String getWname() {
        return wname;
    }

    public String getWauthor() {
        return wauthor;
    }

    private String wauthor;
}
