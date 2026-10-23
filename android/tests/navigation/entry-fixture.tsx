import {createRoot} from 'react-dom/client'
import {App} from '../../mobile/overlays/app/App'
import '../../mobile/overlays/platform/native-ux.css'
import './entry-fixture.css'
createRoot(document.getElementById('root')!).render(<App/> )
