package com.example.demo.Modelos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/*1. ENRUTAR TABLA */
@Entity
@Table(name = "adminoperativo")
public class AdminOperativo {

/*2. ENRUTAR TABLA */
    @Id
    @Column(unique = true, nullable = false, name = "idop")
    private String idop;
    private String nameop;
    private String emailop;
    public String getnameop() {
        return this.nameop;
    }
    public void setnameop(String nameop) {
        this.nameop = nameop;
    }
    public String getidop() {
        return this.idop;
    }
    public void setidop(String idop) {
        this.idop = idop;
    }
    public String getemailop() {
        return this.emailop;
    }
    public void setemailop(String emailop) {
        this.emailop = emailop;
    }

   
    
}

