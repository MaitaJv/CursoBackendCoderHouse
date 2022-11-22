import { Router } from "express";
import upload from "../libs/multer.js";

const router = Router();
const productos = [
  {
    id: 1,
    title: "tele",
    price: 10000,
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmui.today%2F__export%2F1602378684955%2Fsites%2Fmui%2Fimg%2F2020%2F10%2F10%2F58.jpg_693687776.jpg&f=1&nofb=1&ipt=5748c2e33eff91b05198e6a1e4030bd4d719cfe9a6205ac42dd5f2183ee67d41&ipo=images",
  },
  {
    id: 2,
    title: "celular",
    price: 5000,
    image:
      "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimagenesnoticias.com%2Fwp-content%2Fuploads%2F2017%2F11%2FPerrosGraciosos45.jpg&f=1&nofb=1&ipt=331c9060a4ac587e697e513401159b258ccbd56cb359fdd19f0d629a55d6f1ed&ipo=images",
  },
  {
    id: 3,
    title: "heladera",
    price: 30000,
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.doogweb.es%2Fwp-content%2Fuploads%2F2016%2F03%2FLabrador-retriever-1024x675.jpg&f=1&nofb=1&ipt=a10c408cb0cb83f4bdad8c78bd8c666b5331a71698a03a6edfd3f35196bad74e&ipo=images",
  },
];

router
  .route("/")
  .get((req, res) => {
    const response = {
      status: "Ok",
      data: productos,
    };

    res.json(response);
  })
  .post(upload.single("productoImage"), (req, res) => {
    const { title, price } = req.body;
    const image = req.file;
    const newProductoId = productos[productos.length - 1].id + 1;

    const newProducto = {
      id: newProductoId,
      title,
      price,
      image: `http://localhost:3000/images/${image.originalname}`,
    };
    const response = {
      status: "Created",
      data: newProducto,
    };

    productos.push(newProducto);

    res.status(201).json(response);
  });

router
  .route("/:id")
  .put((req, res) => {
    const { id } = req.params;
    const { title, price } = req.body;
    const indexProductoToUpdate = productos.find((producto) => producto.id === Number(id));

    if (!indexProductoToUpdate) {
      return res.status(404).json({ status: "Not found", data: null });
    }

    productos.splice(indexProductoToUpdate, 1, { id, title, price });

    res.status(200).json({
      status: "Updated",
      data: { id, title, price },
    });
  })
  .delete( (req, res) => {
    const { id } = req.params;
    const indexProductoToUpdate = productos.findIndex((producto) => producto.id === Number(id));
    const productoToDelete = productos[indexProductoToUpdate];

    if (!productoToDelete) {
      return res.status(404).json({ status: "Not found", data: null });
    }

    productos.splice(indexProductoToUpdate, 1);

    res.status(200).json({
      status: "Deleted",
      data: productoToDelete,
    });
  })
  .get((req, res) => {
    const { id } = req.params;
    const producto = productos.find((producto) => producto.id === Number(id));
    const response = producto
      ? { status: "Ok", data: producto }
      : { status: "producto no encontrado", data: null };
    const statusCode = producto ? 200 : 404;

    res.status(statusCode).json(response);
  });

export default router;
