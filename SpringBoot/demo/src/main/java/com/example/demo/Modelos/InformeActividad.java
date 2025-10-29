package com.example.demo.Modelos;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "informeactividad")

public class InformeActividad {

    @Id
    @Column(unique = true, nullable = false, name = "idia")

    private String idia;
    private String descripcionia;
    private String fechaia;
    public String getidia() {
        return this.idia;
    }
    public void setidia(String idia) {
        this.idia = idia;
    }
    public String getdescripcionia() {
        return this.descripcionia;
    }
    public void setdescripcionia(String descripcionia) {
        this.descripcionia = descripcionia;
    }
    public String getfechaia() {
        return this.fechaia;
    }
    public void setfechaia(String fechaia) {
        this.fechaia = fechaia;
    }
}
