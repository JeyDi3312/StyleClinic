package StyleClinic.StyleClinic.models;

import jakarta.persistence.*;

@Entity
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idproducto;

    private String nombreproducto;
    private String imageproducto;
    private String priceproducto;
    private String descriptionproducto;
    private String cantidadproducto;
    private String tallaproducto;

    public String getCantidadproducto() {
        return cantidadproducto;
    }
    public void setCantidadproducto(String cantidadproducto) {
        this.cantidadproducto = cantidadproducto;
    }
    public Long getIdproducto() {
        return idproducto;
    }
    public void setIdproducto(Long idproducto) {
        this.idproducto = idproducto;
    }
    public String getNombreproducto() {
        return nombreproducto;
    }
    public void setNombreproducto(String nombreproducto) {
        this.nombreproducto = nombreproducto;
    }
    public String getImageproducto() {
        return imageproducto;
    }
    public void setImageproducto(String imageproducto) {
        this.imageproducto = imageproducto;
    }
    public String getPriceproducto() {
        return priceproducto;
    }
    public void setPriceproducto(String priceproducto) {
        this.priceproducto = priceproducto;
    }
    public String getDescriptionproducto() {
        return descriptionproducto;
    }
    public void setDescriptionproducto(String descriptionproducto) {
        this.descriptionproducto = descriptionproducto;
    }
    public String getTallaproducto() {
        return tallaproducto;
    }
    public void setTallaproducto(String tallaproducto) {
        this.tallaproducto = tallaproducto;
    }
}
