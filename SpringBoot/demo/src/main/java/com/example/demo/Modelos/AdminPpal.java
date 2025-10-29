package com.example.demo.Modelos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "adminppal")

public class AdminPpal {

    @Id
    @Column(unique = true, nullable = false, name = "idap")

    private String idap;
    private String nameap;
    private String emailap;
    public String getnameap() {
        return this.nameap;
    }
    public void setnameap(String nameap) {
        this.nameap = nameap;
    }
    public String getidap() {
        return this.idap;
    }
    public void setidap(String idap) {
        this.idap = idap;
    }
    public String getemailap() {
        return this.emailap;
    }
    public void setemailap(String emailap) {
        this.emailap = emailap;
    }
  

    
}
