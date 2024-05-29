package com.example.facturaPOS.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.facturaPOS.model.ItemPedido;
import com.example.facturaPOS.model.Menu;
import com.example.facturaPOS.model.Mesa;
import com.example.facturaPOS.model.Pedido;
import com.example.facturaPOS.repository.ClienteRepository;
import com.example.facturaPOS.repository.EstadoPedidoRepository;
import com.example.facturaPOS.repository.ItemMenuRepository;
import com.example.facturaPOS.repository.ItemPedidoRepository;
import com.example.facturaPOS.repository.MesaRepository;
import com.example.facturaPOS.repository.PedidoRepository;
import com.example.facturaPOS.repository.UsuarioRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ItemPedidoRepository itemPedidoRepository;

    @Autowired
    private ItemMenuRepository itemMenuRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private MesaRepository mesaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private EstadoPedidoRepository estadoPedidoRepository;

    public Pedido crearPedido(Pedido pedido, List<ItemPedido> itemsPedido) {
        // Calcular el total del pedido sumando los precios de los items
        BigDecimal totalPedido = BigDecimal.ZERO;

        for (ItemPedido itemPedido : itemsPedido) {
            // Obtener el precio por unidad del menú utilizando el repositorio de ItemMenuRepository
            Optional<Menu> optionalMenu = itemMenuRepository.findById(itemPedido.getMenu().getIdMenu());
            if (optionalMenu.isPresent()) {
                BigDecimal precioPorUnidad = optionalMenu.get().getPrecio();
                BigDecimal precioPorCantidad = precioPorUnidad.multiply(BigDecimal.valueOf(itemPedido.getCantidad()));
                itemPedido.setPrecioPorCantidad(precioPorCantidad);
                totalPedido = totalPedido.add(precioPorCantidad);
            } else {
                // Manejar el caso en que el menú no se encuentre en la base de datos
                throw new NoSuchElementException("No se encontró el menú en la base de datos.");
                // Puedes personalizar el mensaje de la excepción según tus necesidades
            }
        }

        // Calcular el IVA (asumiendo un 16% de IVA)
        BigDecimal iva = totalPedido.multiply(new BigDecimal("0.16"));

        // Establecer el subtotal y el IVA en el pedido
        pedido.setSubtotal(totalPedido);
        pedido.setIVA(iva);

        // Guardar el pedido en la base de datos
        Pedido pedidoGuardado = pedidoRepository.save(pedido);

        // Cargar los datos de las claves foráneas sin cargar sus relaciones secundarias
        pedidoGuardado.setUsuario(usuarioRepository.findById(pedidoGuardado.getUsuario().getIdUsuario()).orElse(null));

        // Cargar los datos de la mesa sin cargar sus relaciones secundarias
        Mesa mesa = mesaRepository.findById(pedidoGuardado.getMesa().getIdMesa()).orElse(null);
        if (mesa != null) {
            Mesa mesaReducida = new Mesa();
            mesaReducida.setIdMesa(mesa.getIdMesa());
            mesaReducida.setEstadoMesa(mesa.getEstadoMesa());
            pedidoGuardado.setMesa(mesaReducida);
        }

        pedidoGuardado.setCliente(clienteRepository.findById(pedidoGuardado.getCliente().getIdCliente()).orElse(null));
        pedidoGuardado.setEstadoPedido(estadoPedidoRepository.findById(pedidoGuardado.getEstadoPedido().getIdEstadoPedido()).orElse(null));

        // Asociar cada item al pedido y guardarlos en la base de datos
        for (ItemPedido itemPedido : itemsPedido) {
            itemPedido.setPedido(pedidoGuardado);
            itemPedidoRepository.save(itemPedido);
        }

        return pedidoGuardado;
    }


    public boolean calculateAndSaveTip(Integer idPedido, Float tipPercentage) {
        Optional<Pedido> optionalPedido = pedidoRepository.findById(idPedido);
        if (optionalPedido.isPresent()) {
            Pedido pedido = optionalPedido.get();
            BigDecimal subtotal = pedido.getSubtotal();
            BigDecimal tipAmount = subtotal.multiply(BigDecimal.valueOf(tipPercentage / 100));
            pedido.setPropina(tipAmount);
            pedido.setSubtotal(subtotal);
            pedidoRepository.save(pedido);
            return true;
        } else {
            return false;
        }
    }
}
