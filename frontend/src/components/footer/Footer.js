import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'


export default function Footer (){
    return <footer>
        <Box px={{xs:3,sm:10}} py={{xs:5,sm:10}} bgcolor="#f27121" color="#ffffff">
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1} fontWeight="fontWeightBold" >Contacto</Box>
                        <Box>
                            <Link href="/" color="inherit" >
                            Contáctanos                            
                            </Link>
                        </Box>
                        <Box>
                            <Link href="/" color="inherit" >
                            Acerca de nosotros                            
                            </Link>
                        </Box>

                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1} fontWeight="fontWeightBold" >Cuenta</Box>
                        <Box>
                            <Link href="https://ec-webft11-g10.vercel.app/login" color="inherit" >
                            Iniciar sesión                            
                            </Link>
                        </Box>
                        <Box>
                            <Link href="https://ec-webft11-g10.vercel.app/signup" color="inherit" >
                            Crear cuenta                            
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={1} fontWeight="fontWeightBold">Equipo EATX</Box>
                        <Box>
                            <Link href="https://www.linkedin.com/in/martincavanagh/" color="inherit" >
                            Martín Cavanagh                            
                            </Link>
                        </Box>
                     
               
                    </Grid>

                </Grid>
                <Box textAlign="center" pt={{xs:5,sm:10}} pb={{xs:5,sm:0}}>
                Copyright © EATX {new Date().getFullYear()}
                </Box>

            </Container>
        </Box>
        </footer>
}