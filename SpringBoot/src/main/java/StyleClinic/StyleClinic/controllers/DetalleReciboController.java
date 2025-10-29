package StyleClinic.StyleClinic.controllers;

import StyleClinic.StyleClinic.models.DetalleRecibo;
import StyleClinic.StyleClinic.repositories.DetalleReciboRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/detalles-recibo")
public class DetalleReciboController {

    @Autowired
    private DetalleReciboRepository detalleReciboRepository;

    @GetMapping
    public List<DetalleRecibo> getAllDetalles() {
        return detalleReciboRepository.findAll();
    }

    @PostMapping
    public DetalleRecibo createDetalle(@RequestBody DetalleRecibo detalle) {
        return detalleReciboRepository.save(detalle);
    }
}
