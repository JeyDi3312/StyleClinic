package com.example.demo.Modelos;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "reviews")

public class Reviews {

    @Id
    @Column(unique = true, nullable = false, name = "idreview")

    private String idreview;
    private String fechareview;
    public String getidreview() {
        return this.idreview;
    }
    public void setidreview(String idreview) {
        this.idreview = idreview;
    }
    public String getfechareview() {
        return this.fechareview;
    }
    public void setfechareview(String fechareview) {
        this.fechareview = fechareview;
    }
    
}
