package com.example.demo.Modelos;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "pagos")

public class Pagos {

    @Id
    @Column(unique = true, nullable = false, name = "idpago")

    private String idpago;
    private String fechapago;
    public String getidpago() {
        return this.idpago;
    }
    public void setidpago(String idpago) {
        this.idpago = idpago;
    }
    public String getfechapago() {
        return this.fechapago;
    }
    public void setfechapago(String fechapago) {
        this.fechapago = fechapago;
    }

    
}
