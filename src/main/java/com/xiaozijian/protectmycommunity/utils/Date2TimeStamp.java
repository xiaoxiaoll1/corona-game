package com.xiaozijian.protectmycommunity.utils;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Date2TimeStamp {

    /**
     *  Transfer the date data type
     * @author Qiu Mengke
     * @param date
     * @return
     * @throws ParseException
     */
    public static Timestamp date2timeStamp(Date date) throws ParseException {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String timeStampString=df.format(date);
        date=df.parse(timeStampString);
        return new Timestamp(date.getTime());
    }
}
