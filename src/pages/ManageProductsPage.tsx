import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../api/products";
import { styled } from "@mui/material/styles";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

// Styled components for cleaner and reusable styling
const StyledTableContainer = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  padding: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0.5),
  textTransform: "none",
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    padding: theme.spacing(2),
    maxWidth: "500px",
  },
}));

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleOpenDialog = (product?: Product) => {
    setCurrentProduct(
      product || { name: "", description: "", price: 0, category: "" }
    );
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentProduct(null);
  };

  const handleAddOrEditProduct = async () => {
    if (currentProduct) {
      try {
        if (currentProduct._id) {
          await updateProduct(currentProduct._id, currentProduct as Product);
        } else {
          await createProduct(currentProduct as Product);
        }
        loadProducts();
        handleCloseDialog();
      } catch (err) {
        setError((err as Error).message);
      }
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);
      loadProducts();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <StyledTableContainer>
      <Typography variant="h4" align="center" sx={{ my: 2 }}>
        Product List
      </Typography>
      <StyledButton
        variant="contained"
        color="primary"
        onClick={() => handleOpenDialog()}
        sx={{ alignSelf: "flex-end", marginBottom: 2 }}
      >
        Add Product
      </StyledButton>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Description</strong></TableCell>
            <TableCell><strong>Price</strong></TableCell>
            <TableCell><strong>Category</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id} hover>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                <StyledButton
                  color="primary"
                  onClick={() => handleOpenDialog(product)}
                >
                  Edit
                </StyledButton>
                <StyledButton
                  color="secondary"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  Delete
                </StyledButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <StyledDialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          {currentProduct?._id ? "Edit Product" : "Add Product"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            variant="outlined"
            value={currentProduct?.name || ""}
            onChange={(e) =>
              setCurrentProduct({ ...currentProduct!, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            variant="outlined"
            value={currentProduct?.description || ""}
            onChange={(e) =>
              setCurrentProduct({
                ...currentProduct!,
                description: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            variant="outlined"
            value={currentProduct?.price || ""}
            onChange={(e) =>
              setCurrentProduct({ ...currentProduct!, price: +e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Category"
            fullWidth
            variant="outlined"
            value={currentProduct?.category || ""}
            onChange={(e) =>
              setCurrentProduct({
                ...currentProduct!,
                category: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleAddOrEditProduct}
            color="primary"
            variant="contained"
          >
            {currentProduct?._id ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </StyledDialog>
    </StyledTableContainer>
  );
};

export default ProductList;
