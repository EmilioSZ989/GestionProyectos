package com.example.facturaPOS.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.facturaPOS.model.EstadoMesa;
import com.example.facturaPOS.model.EstadoPedido;
import com.example.facturaPOS.model.ItemMenu;
import com.example.facturaPOS.model.ItemPedido;
import com.example.facturaPOS.model.Mesa;
import com.example.facturaPOS.model.Pedido;
import com.example.facturaPOS.repository.EstadoMesaRepository;
import com.example.facturaPOS.repository.ItemMenuRepository;
import com.example.facturaPOS.repository.ItemPedidoRepository;
import com.example.facturaPOS.repository.MesaRepository;
import com.example.facturaPOS.repository.PedidoRepository;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ItemMenuRepository itemMenuRepository;
    
    @Autowired
    private ItemPedidoRepository itemPedidoRepository;
    
    @Autowired
    private MesaRepository mesaRepository;
    
    @Autowired
    private EstadoMesaRepository estadoMesaRepository;

    @Autowired
    private ConfiguracionService configuracionService;  // Agregamos la inyección de ConfiguracionService

    @Transactional
    public Pedido crearPedido(Pedido pedido, List<ItemPedido> items, BigDecimal porcentajePropina) {
        // Asignar fecha y hora actuales al pedido
        pedido.setFechaPedido(LocalDate.now());
        pedido.setHoraPedido(LocalTime.now());

        // Calcular subtotal
        BigDecimal subtotal = BigDecimal.ZERO;
        for (ItemPedido item : items) {
            // Obtener el ItemMenu correspondiente al idItemMenu
            ItemMenu itemMenu = itemMenuRepository.findById(item.getItemMenu().getIdItemMenu())
                                .orElseThrow(() -> new IllegalArgumentException("No se encontró el ItemMenu con ID: " + item.getItemMenu().getIdItemMenu()));

            if (itemMenu.getPrecio() == null) {
                throw new IllegalArgumentException("El precio del ItemMenu no puede ser nulo.");
            }

            BigDecimal precioPorCantidad = itemMenu.getPrecio().multiply(BigDecimal.valueOf(item.getCantidad()));
            subtotal = subtotal.add(precioPorCantidad);

            // Asignar valores al ItemPedido
            item.setPrecioPorCantidad(precioPorCantidad.setScale(2, RoundingMode.HALF_UP));
            item.setPedido(pedido);
        }

        // Obtener el IVA desde la configuración
        BigDecimal ivaPorcentaje = configuracionService.obtenerIVA();

        BigDecimal iva = subtotal.multiply(ivaPorcentaje).divide(BigDecimal.valueOf(1)); // Calcula el IVA basado en el porcentaje configurado
        
        // Calcular propina
        BigDecimal propina = subtotal.multiply(porcentajePropina.divide(BigDecimal.valueOf(1))); // Calcula la propina basada en el porcentaje proporcionado

        // Calcular total
        BigDecimal total = subtotal.add(iva).add(propina);

        // Asignar valores calculados al pedido
        pedido.setSubtotal(subtotal.setScale(2, RoundingMode.HALF_UP));
        pedido.setIva(iva.setScale(2, RoundingMode.HALF_UP));
        pedido.setPropina(propina.setScale(2, RoundingMode.HALF_UP));
        pedido.setTotal(total.setScale(2, RoundingMode.HALF_UP));
        
        // Guardar los ítems de pedido en la base de datos
        for (ItemPedido item : items) {
            itemPedidoRepository.save(item);
        }

        // Guardar el pedido en la base de datos
        return pedidoRepository.save(pedido);
    }


    
    public List<Pedido> obtenerTodosLosPedidos() {
        return pedidoRepository.findAll();
    }

    public void actualizarEstadoPedido(Long idPedido, EstadoPedido estadoPedido) {
        Pedido pedido = pedidoRepository.findById(idPedido)
            .orElseThrow(() -> new RuntimeException("Pedido no encontrado con el ID: " + idPedido));
        pedido.setEstadoPedido(estadoPedido);
        pedidoRepository.save(pedido);
    }
    
    public void asignarPedidoAMesa(Long idPedido, Long idMesa) {
        // Buscamos el pedido por su ID
        Pedido pedido = pedidoRepository.findById(idPedido)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado con el ID: " + idPedido));
        
        // Buscamos la mesa por su ID
        Mesa mesa = mesaRepository.findById(idMesa)
                .orElseThrow(() -> new RuntimeException("Mesa no encontrada con el ID: " + idMesa));
        
        // Verificamos que la mesa esté disponible
        if (mesa.getEstadoMesa().getIdEstadoMesa() == 2) {
            throw new RuntimeException("La mesa con ID " + idMesa + " no está disponible.");
        }
        
        // Asignamos la mesa al pedido
        pedido.setMesa(mesa);
        
        // Cambiamos el estado de la mesa a "ocupado"
        EstadoMesa estadoMesaOcupado = estadoMesaRepository.findById(2L)
                .orElseThrow(() -> new RuntimeException("Estado de mesa \"ocupado\" no encontrado."));
        mesa.setEstadoMesa(estadoMesaOcupado);
        
        // Guardamos el pedido actualizado en la base de datos
        pedidoRepository.save(pedido);
        // Guardamos la mesa actualizada en la base de datos
        mesaRepository.save(mesa);
    }
}
