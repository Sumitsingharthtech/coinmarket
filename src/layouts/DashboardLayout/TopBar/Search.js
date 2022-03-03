import React, { useState } from 'react';
import ellipsis from 'src/utils/ellipsis';
import { API } from 'src/constants';
import { Link as RouterLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  IconButton,
  InputAdornment,
  Link,
  SvgIcon,
  TextField,
  Tooltip,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  Search as SearchIcon,
  XCircle as XIcon
} from 'react-feather';
import axios from 'src/utils/axios';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 500,
    maxWidth: '100%'
  },
  searchButton: {
    color: theme.topBarColor
  }
}));

function Search() {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API.BASE_URL}/search?term=${value}`);

      setResults(response.data);
    } catch (error) {
      enqueueSnackbar('Something went wrong', {
        variant: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Tooltip title="Search">
        <IconButton
          onClick={handleOpen}
          className={classes.searchButton}
        >
          <SvgIcon fontSize="small">
            <SearchIcon />
          </SvgIcon>
        </IconButton>
      </Tooltip>
      <Drawer
        anchor="right"
        classes={{ paper: classes.drawer }}
        ModalProps={{ BackdropProps: { invisible: true } }}
        onClose={handleClose}
        open={isOpen}
        variant="temporary"
      >
        <PerfectScrollbar options={{ suppressScrollX: true }}>
          <Box p={3}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="h4"
                color="textPrimary"
              >
                Search
              </Typography>
              <IconButton onClick={handleClose}>
                <SvgIcon fontSize="small">
                  <XIcon />
                </SvgIcon>
              </IconButton>
            </Box>
            <Box mt={2}>
              <TextField
                className={classes.queryField}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                onChange={(event) => setValue(event.target.value)}
                placeholder="Search block &amp; transactions by hash or height"
                value={value}
                variant="outlined"
              />
            </Box>
            <Box
              mt={2}
              display="flex"
              justifyContent="flex-end"
            >
              <Button
                color="secondary"
                variant="contained"
                onClick={handleSearch}
              >
                Search
              </Button>
            </Box>
            <Box mt={4}>
              {isLoading ? (
                <Box
                  display="flex"
                  justifyContent="center"
                >
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  {results && results.map((result) => {
                    if (result.type === 'beacon-block') {
                      return (
                        <Box mb={2} key={result.hash}>
                          <Link
                            variant="h4"
                            color="textPrimary"
                            component={RouterLink}
                            to={`/blockchain/beacon-chain/${result.hash}`}
                          >
                            Beacon block
                            {' '}
                            {result.height}
                          </Link>
                          <Typography
                            variant="body2"
                            color="textPrimary"
                          >
                            {ellipsis(result.hash, 8)}
                          </Typography>
                        </Box>
                      );
                    } if (result.type === 'shard-block') {
                      return (
                        <Box mb={2} key={result.hash}>
                          <Link
                            variant="h4"
                            color="textPrimary"
                            component={RouterLink}
                            to={`/blockchain/shard-blocks/${result.hash}`}
                          >
                            Shard
                            {' '}
                            {result.shard}
                            {' '}
                            block
                            {' '}
                            {result.height}
                          </Link>
                          <Typography
                            variant="body2"
                            color="textPrimary"
                          >
                            {ellipsis(result.hash, 8)}
                          </Typography>
                        </Box>
                      );
                    } if (result.type === 'transaction') {
                      return (
                        <Box mb={2} key={result.hash}>
                          <Link
                            variant="h4"
                            color="textPrimary"
                            component={RouterLink}
                            to={`/blockchain/transactions/${result.hash}`}
                          >
                            Transaction
                          </Link>
                          <Typography
                            variant="body2"
                            color="textPrimary"
                          >
                            {ellipsis(result.hash, 8)}
                          </Typography>
                        </Box>
                      );
                    } if (result.type === 'mempool-transaction') {
                      return (
                        <Box mb={2} key={result.hash}>
                          <Link
                            variant="h4"
                            color="textPrimary"
                            component={RouterLink}
                            to={`/blockchain/transactions/${result.hash}?mined=false`}
                          >
                            Transaction in Mempool
                          </Link>
                          <Typography
                            variant="body2"
                            color="textPrimary"
                          >
                            {ellipsis(result.hash, 8)}
                          </Typography>
                        </Box>
                      );
                    }
                    return null;
                  })}
                </>
              )}
            </Box>
          </Box>
        </PerfectScrollbar>
      </Drawer>
    </>
  );
}

export default Search;
