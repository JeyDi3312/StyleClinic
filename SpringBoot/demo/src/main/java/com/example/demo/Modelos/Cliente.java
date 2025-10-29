package com.example.demo.Modelos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "cliente")

public class Cliente {
    
    @Id
    @Column(unique = true, nullable = false, name = "idcliente")

    private String idcliente;
    private String namecliente;
    private String emailcliente;
    private String adresscliente;
    public String getidcliente() {
        return this.idcliente;
    }
    public void setidcliente(String idcliente) {
        this.idcliente = idcliente;
    }
    public String getnamecliente() {
        return this.namecliente;
    }
    public void setnamecliente(String namecliente) {
        this.namecliente = namecliente;
    }
    public String getemailcliente() {
        return this.emailcliente;
    }
    public void setemailcliente(String emailcliente) {
        this.emailcliente = emailcliente;
    }
    public String getadresscliente() {
        return this.adresscliente;
    }
    public void setadresscliente(String adresscliente) {
        this.adresscliente = adresscliente;
    }
    
}

/*
 * TIPOS DE RELACIONES 
 * @onetoone -> 1 a 1
 * @onetomany -> 1 a n
 * @manytoone -> n a 1
 * @manytomany -> n a m
 * 
 * 
 * @onetoone (mappedby."id" cascade=cascade)
 */