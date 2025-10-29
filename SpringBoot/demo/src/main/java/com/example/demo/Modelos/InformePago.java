package com.example.demo.Modelos;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "informepago")

public class InformePago {

    @Id
    @Column(unique = true, nullable = false, name = "idip")

    private String idip;
    private String descripcionip;
    private String fechaip;
    public String getidip() {
        return this.idip;
    }
    public void setidip(String idip) {
        this.idip = idip;
    }
    public String getdescripcionip() {
        return this.descripcionip;
    }
    public void setdescripcionip(String descripcionip) {
        this.descripcionip = descripcionip;
    }
    public String getfechaip() {
        return this.fechaip;
    }
    public void setfechaip(String fechaip) {
        this.fechaip = fechaip;
    }
}
