package com.example.demo.Modelos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "profesional")

public class Profesional {

    @Id
    @Column(unique = true, nullable = false, name = "idprofesional")

    private String idprofesional;
    private String tipoprofesional;
    private String nameprofesional;
    private String emailprofesional;
    private String adressprofesional;
    public String getidprofesional() {
        return this.idprofesional;
    }
    public void setidprofesional(String idprofesional) {
        this.idprofesional = idprofesional;
    }
    public String gettipoprofesional() {
        return this.tipoprofesional;
    }
    public void settipoprofesional(String tipoprofesional) {
        this.tipoprofesional = tipoprofesional;
    }
    public String getnameprofesional() {
        return this.nameprofesional;
    }
    public void setnameprofesional(String nameprofesional) {
        this.nameprofesional = nameprofesional;
    }
    public String getemailprofesional() {
        return this.emailprofesional;
    }
    public void setemailprofesional(String emailprofesional) {
        this.emailprofesional = emailprofesional;
    }
    public String getadressprofesional() {
        return this.adressprofesional;
    }
    public void setadressprofesional(String adressprofesional) {
        this.adressprofesional = adressprofesional;
    }
    
}
