package com.example.demo.Modelos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "solicitudes")

public class Solicitudes {

    @Id
    @Column(unique = true, nullable = false, name = "idsolicitud")

    private String idsolicitud;
    private String descripcionsolicitud;
    private String fechasolicitud;
    public String getidsolicitud() {
        return this.idsolicitud;
    }
    public void setidsolicitud(String idsolicitud) {
        this.idsolicitud = idsolicitud;
    }
    public String getdescripcionsolicitud() {
        return this.descripcionsolicitud;
    }
    public void setdescripcionsolicitud(String descripcionsolicitud) {
        this.descripcionsolicitud = descripcionsolicitud;
    }
    public String getfechasolicitud() {
        return this.fechasolicitud;
    }
    public void setfechasolicitud(String fechasolicitud) {
        this.fechasolicitud = fechasolicitud;
    }
    
}
