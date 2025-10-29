package StyleClinic.StyleClinic.controllers;

import StyleClinic.StyleClinic.models.Recibo;
import StyleClinic.StyleClinic.repositories.ReciboRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recibos")
public class ReciboController {

    @Autowired
    private ReciboRepository reciboRepository;

    @GetMapping
    public List<Recibo> getAllRecibos() {
        return reciboRepository.findAll();
    }

    @PostMapping
    public Recibo createRecibo(@RequestBody Recibo recibo) {
        return reciboRepository.save(recibo);
    }
}
