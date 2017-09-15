package com.rzico.weex.model.info;

/**
 * Created by Jinlesoft on 2017/9/14.
 */

public class Message {
    private String type;
    private Object data;
    private String content;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
