package me.tomsen.restapi.api;

import javax.xml.bind.annotation.adapters.XmlAdapter;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created with IntelliJ IDEA.
 * User: ebaranov
 * Date: 9/15/13
 * Time: 2:35 PM
 * To change this template use File | Settings | File Templates.
 */
public class DateAdapter extends XmlAdapter<String, Date> {

    private SimpleDateFormat dateFormat = new SimpleDateFormat("d/M/yyyy");


    @Override
    public Date unmarshal(String s) throws Exception {
        return dateFormat.parse(s);
    }

    @Override
    public String marshal(Date date) throws Exception {
        return dateFormat.format(date);
    }
}
