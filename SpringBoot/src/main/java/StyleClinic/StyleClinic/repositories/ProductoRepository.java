package StyleClinic.StyleClinic.repositories;
import StyleClinic.StyleClinic.models.Producto;

import org.springframework.data.jpa.repository.JpaRepository;



public interface ProductoRepository extends JpaRepository<Producto, Long> {
}