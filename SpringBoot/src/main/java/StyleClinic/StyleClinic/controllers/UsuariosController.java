package StyleClinic.StyleClinic.controllers;

import StyleClinic.StyleClinic.models.Usuarios;
import StyleClinic.StyleClinic.repositories.UsuariosRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:3000")

public class UsuariosController {

    @Autowired
    private UsuariosRepository usuariosRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuarios user) {
        Usuarios foundUser = usuariosRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
        if (foundUser != null) {
            return ResponseEntity.ok(foundUser);
        } else {
            return ResponseEntity.status(401).body("Credenciales inválidas");
        }
    }
 
   @PostMapping("/register")
public ResponseEntity<?> registerUser(@RequestBody Usuarios nuevoUsuario) {
    // Verificar si el email ya está registrado
    if (usuariosRepository.findByEmail(nuevoUsuario.getEmail()) != null) {
        return ResponseEntity.status(400).body("El correo electrónico ya está registrado.");
    }

    // Guardar nuevo usuario
    Usuarios usuarioGuardado = usuariosRepository.save(nuevoUsuario);
    return ResponseEntity.ok(usuarioGuardado);
}


}
