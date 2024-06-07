import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  DataGrid,
  GridColDef,
  GridRowIdGetter,
  GridToolbarQuickFilter,
  GridValidRowModel,
} from '@mui/x-data-grid';

/**
 * Autor: Jordi Segura Madrigal
 * Fecha: 6/6/2024
 * Descripción: Interface para los parámetros del componente Tabla.
 */
interface TablaProps {
  id?: string;
  titulo: string;
  columnas: GridColDef[];
  registros: GridValidRowModel[];
  cargando?: boolean;
  customDatosId?: GridRowIdGetter;
  registrosPorPaginaOpciones?: number[];
  modeloPaginacion?: {
    paginaActual: number;
    registrosPorPaginaSeleccionado: number;
  };
}

/**
 * Autor: Jordi Segura Madrigal
 * Fecha: 6/6/2024
 * Descripción: Componente de barra de herramientas.
 * @returns Componente de barra de herramientas.
 */
function Toolbar(props: { titulo: string }) {
  return (
    <Box
      sx={{
        p: 1,
        pb: 0,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant='h6' gutterBottom>
        {props.titulo}
      </Typography>
      <GridToolbarQuickFilter placeholder='Buscar' />
    </Box>
  );
}

/**
 * Autor: Jordi Segura Madrigal
 * Fecha: 6/6/2024
 * Descripción: Tabla estándar para mostrat información e interactuar con los datos.
 * @returns El componente de la tabla con sus herramientas.
 */
export const Tabla = (props: TablaProps) => {
  return (
    <DataGrid
      rows={props.registros}
      columns={props.columnas}
      loading={props.cargando}
      initialState={{
        pagination: {
          paginationModel: props.modeloPaginacion
            ? {
                page: props.modeloPaginacion.paginaActual,
                pageSize: props.modeloPaginacion.registrosPorPaginaSeleccionado,
              }
            : { page: 0, pageSize: 25 },
        },
      }}
      pageSizeOptions={
        props.registrosPorPaginaOpciones
          ? props.registrosPorPaginaOpciones
          : [25, 50, 100]
      }
      getRowId={props.customDatosId}
      slots={{ toolbar: Toolbar }}
      slotProps={{
        toolbar: {
          titulo: props.titulo,
        },
      }}
    />
  );
};
