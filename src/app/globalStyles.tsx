import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyles = createGlobalStyle`
    ${reset};
    body {
      min-width: 1200px;
    }    
`

export default GlobalStyles
