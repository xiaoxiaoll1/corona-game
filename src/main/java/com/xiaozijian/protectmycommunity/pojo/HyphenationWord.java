package com.xiaozijian.protectmycommunity.pojo;

public class HyphenationWord {
    private String wordListName;
    private String word;
    private String hword;
    private Integer wid;

    public HyphenationWord(){

    }
    public HyphenationWord(String wordListName, String word, String hword, Integer wid) {
        this.wordListName = wordListName;
        this.word = word;
        this.hword = hword;
        this.wid = wid;
    }

    @Override
    public String toString() {
        return "HyphenationWord{" +
                "wordListName='" + wordListName + '\'' +
                ", word='" + word + '\'' +
                ", hword='" + hword + '\'' +
                ", wid=" + wid +
                '}';
    }

    public String getWordListName() {
        return wordListName;
    }

    public void setWordListName(String wordListName) {
        this.wordListName = wordListName;
    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public String getHword() {
        return hword;
    }

    public void setHword(String hword) {
        this.hword = hword;
    }

    public Integer getWid() {
        return wid;
    }

    public void setWid(Integer wid) {
        this.wid = wid;
    }
}
