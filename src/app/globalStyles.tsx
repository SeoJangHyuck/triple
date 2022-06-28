import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyles = createGlobalStyle`
    ${reset};
    
    html, body {
      font-size: 14px;
    }

    strong {
      font-weight: bold;
    }
    
    .center {
      width: 1200px;
      margin: 0 auto;
      overflow: auto;
    }    
`

export default GlobalStyles
