const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// Array de productos
const products = [
    { name: "Laptop", category: "electrónica", price: 1200, stock: 5, discount: 0 },
    { name: "Televisor", category: "electrónica", price: 800, stock: 3, discount: 10 },
    { name: "Sofá", category: "hogar", price: 500, stock: 8, discount: 15 },
    { name: "Mesa de comedor", category: "hogar", price: 700, stock: 2, discount: 0 },
    { name: "Pan", category: "alimentos", price: 1.5, stock: 50, discount: 0 },
    { name: "Leche", category: "alimentos", price: 1.2, stock: 20, discount: 5 },
];

// Función para preguntar al usuario
function pregunta(pregunta) {
    return new Promise((resolve) => {
        readline.question(pregunta, (respuesta) => {
            resolve(respuesta);
        });
    });
}

// Función para mostrar el menú principal
async function mostrarMenu() {
    console.log("\n=== MENÚ DE INVENTARIO ===");
    console.log("1. Ver productos con descuento");
    console.log("2. Ver precios con descuento aplicado");
    console.log("3. Ver productos con stock bajo");
    console.log("4. Actualizar stock de un producto");
    console.log("5. Ver resumen por categorías");
    console.log("6. Salir");
    
    const opcion = await pregunta("\nElige una opción (1-6): ");
    return opcion;
}

// 1. Función para mostrar productos con descuento
function mostrarProductosConDescuento() {
    console.log("\n=== PRODUCTOS CON DESCUENTO ===");
    
    let productosConDescuento = [];
    
    for(let producto of products) {
        if(producto.discount > 0) {
            productosConDescuento.push(producto);
        }
    }
    
    if(productosConDescuento.length > 0) {
        for(let producto of productosConDescuento) {
            console.log(`- ${producto.name}: ${producto.discount}% de descuento`);
        }
    } else {
        console.log("No hay productos con descuento.");
    }
}

// 2. Función para mostrar precios con descuento
function mostrarPreciosConDescuento() {
    console.log("\n=== PRECIOS CON DESCUENTO APLICADO ===");
    
    for(let producto of products) {
        let precioFinal = producto.price - (producto.price * producto.discount / 100);
        precioFinal = precioFinal.toFixed(2);
        
        console.log(`- ${producto.name}:`);
        console.log(`  Precio original: $${producto.price}`);
        console.log(`  Descuento: ${producto.discount}%`);
        console.log(`  Precio final: $${precioFinal}`);
    }
}

// 3. Función para mostrar productos con stock bajo
function mostrarProductosStockBajo() {
    console.log("\n=== PRODUCTOS CON STOCK BAJO (menos de 5 unidades) ===");
    
    let productosStockBajo = [];
    
    for(let producto of products) {
        if(producto.stock < 5) {
            productosStockBajo.push(producto);
        }
    }
    
    if(productosStockBajo.length > 0) {
        for(let producto of productosStockBajo) {
            console.log(`- ${producto.name}: ${producto.stock} unidades`);
        }
    } else {
        console.log("No hay productos con stock bajo.");
    }
}

// 4. Función para actualizar stock
async function actualizarStock() {
    const nombreProducto = await pregunta("Ingresa el nombre del producto: ");
    const cantidad = parseInt(await pregunta("Ingresa la cantidad a agregar: "));
    
    let encontrado = false;
    
    for(let producto of products) {
        if(producto.name.toLowerCase() === nombreProducto.toLowerCase()) {
            producto.stock += cantidad;
            console.log(`\nStock actualizado para ${producto.name}`);
            console.log(`Nuevo stock: ${producto.stock} unidades`);
            encontrado = true;
            break;
        }
    }
    
    if(!encontrado) {
        console.log(`\nError: El producto "${nombreProducto}" no existe.`);
    }
}

// 5. Función para mostrar resumen por categorías
function mostrarResumenCategorias() {
    console.log("\n=== RESUMEN POR CATEGORÍAS ===");
    
    let resumen = {
        "electrónica": 0,
        "hogar": 0,
        "alimentos": 0
    };
    
    for(let producto of products) {
        resumen[producto.category]++;
    }
    
    for(let categoria in resumen) {
        console.log(`${categoria}: ${resumen[categoria]} productos`);
    }
}

// Función principal que ejecuta el programa
async function ejecutarPrograma() {
    while(true) {
        const opcion = await mostrarMenu();
        
        switch(opcion) {
            case "1":
                mostrarProductosConDescuento();
                break;
            case "2":
                mostrarPreciosConDescuento();
                break;
            case "3":
                mostrarProductosStockBajo();
                break;
            case "4":
                await actualizarStock();
                break;
            case "5":
                mostrarResumenCategorias();
                break;
            case "6":
                console.log("\n¡Gracias por usar el sistema de inventario!");
                readline.close();
                return;
            default:
                console.log("\nOpción no válida. Por favor, elige una opción del 1 al 6.");
        }
        
        await pregunta("\nPresiona Enter para continuar...");
    }
}

// Iniciamos el programa
ejecutarPrograma();