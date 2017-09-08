package com.rzico.weex.model;

import com.rzico.weex.model.info.BaseEntity;

/**
 * Created by GuanYuCai on 16/6/2.
 */
public class VersionEntity extends BaseEntity {
    private Data data;
    public Data getData() {
        return data;
    }
    public void setData(Data data) {
        this.data = data;
    }
    public class Data {
        private String codeVersion;
        private String descr;
        private String size;
        private String type;
        private String url;
        private String version;


        public String getCodeVersion() {
            return codeVersion;
        }

        public void setCodeVersion(String codeVersion) {
            this.codeVersion = codeVersion;
        }

        public String getDescr() {
            return descr;
        }

        public void setDescr(String descr) {
            this.descr = descr;
        }

        public String getSize() {
            return size;
        }

        public void setSize(String size) {
            this.size = size;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }

        public String getVersion() {
            return version;
        }

        public void setVersion(String version) {
            this.version = version;
        }


    }

}
