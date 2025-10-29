package StyleClinic.StyleClinic.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import StyleClinic.StyleClinic.models.Usuarios;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuariosRepository extends JpaRepository<Usuarios, Integer> {

    Usuarios findByEmailAndPassword(String email, String password);
    Usuarios findByEmail(String email);
}
