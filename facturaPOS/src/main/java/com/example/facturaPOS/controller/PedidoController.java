package com.example.facturaPOS.controller;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.facturaPOS.model.Categoria;
import com.example.facturaPOS.model.EstadoPedido;
import com.example.facturaPOS.model.Pedido;
import com.example.facturaPOS.model.PedidoRequest;
import com.example.facturaPOS.model.PropinaRequest;
import com.example.facturaPOS.model.TotalConPropina;
import com.example.facturaPOS.repository.CategoriaRepository;
import com.example.facturaPOS.repository.ClienteRepository;
import com.example.facturaPOS.repository.PedidoRepository;
import com.example.facturaPOS.service.CategoriaService;
import com.example.facturaPOS.service.PedidoService;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;
    
    @Autowired
    private PedidoRepository pedidoRepository;
    
    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    public ResponseEntity<List<Pedido>> obtenerTodosLosPedidos() {
        return ResponseEntity.ok(pedidoService.obtenerTodosLosPedidos());
    }

    @PostMapping
    public ResponseEntity<Pedido> crearPedido(@RequestBody PedidoRequest pedidoRequest) {
        BigDecimal porcentajePropina = pedidoRequest.getPedido().getPropina(); // Obtener el porcentaje de propina de la solicitud
        Pedido pedido = pedidoService.crearPedido(pedidoRequest.getPedido(), pedidoRequest.getItems(), porcentajePropina);
        return ResponseEntity.status(HttpStatus.CREATED).body(pedido);
    }


    @PutMapping("/{idPedido}/estado")
    public ResponseEntity<Void> actualizarEstadoPedido(@PathVariable Long idPedido, @RequestBody EstadoPedido estadoPedido) {
        pedidoService.actualizarEstadoPedido(idPedido, estadoPedido);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{idPedido}/mesa/{idMesa}")
    public ResponseEntity<Void> asignarPedidoAMesa(@PathVariable Long idPedido, @PathVariable Long idMesa) {
        pedidoService.asignarPedidoAMesa(idPedido, idMesa);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/calcular-propina")
    public ResponseEntity<Pedido> calcularPropina(@RequestBody PropinaRequest propinaRequest) {
        Pedido pedido = pedidoRepository.findById(propinaRequest.getIdPedido())
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado con el ID: " + propinaRequest.getIdPedido()));

        BigDecimal porcentajePropina = propinaRequest.getPorcentajePropina();
        BigDecimal subtotal = pedido.getSubtotal();

        BigDecimal propina = subtotal.multiply(porcentajePropina).divide(BigDecimal.valueOf(1));

        // Calcular total con propina
        BigDecimal totalConPropina = subtotal.add(propina);

        // Actualizar el valor de la propina en el pedido
        pedido.setPropina(propina.setScale(2, RoundingMode.HALF_UP));
        pedido.setTotal(totalConPropina.setScale(2, RoundingMode.HALF_UP));

        // Guardar el pedido actualizado en la base de datos
        Pedido pedidoActualizado = pedidoRepository.save(pedido);

        return ResponseEntity.ok(pedidoActualizado);
    }


    @GetMapping("/categorias")
    public ResponseEntity<List<Categoria>> obtenerTodasLasCategorias() {
        return ResponseEntity.ok(categoriaService.obtenerTodasLasCategorias());
    }

}
