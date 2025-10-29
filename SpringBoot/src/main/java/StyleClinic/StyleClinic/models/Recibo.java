package StyleClinic.StyleClinic.models;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "recibos")
public class Recibo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuarios usuario;

    @Temporal(TemporalType.TIMESTAMP)
    private Date fecha;

    private Double total;

    @OneToMany(mappedBy = "recibo", cascade = CascadeType.ALL)
    private List<DetalleRecibo> detalles;

    // Getters y setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Usuarios getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuarios usuario) {
        this.usuario = usuario;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public List<DetalleRecibo> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<DetalleRecibo> detalles) {
        this.detalles = detalles;
    }
}
