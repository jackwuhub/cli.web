import {App} from "vue";
import 'ant-design-vue/dist/reset.css';
import Icon from './icons'
import {
    ConfigProvider,
    Button,
    Image,
    Layout,
    Typography,
    Row,
    Col,
    Space,
    Switch,
    Popover,
    Avatar,
    Popconfirm
} from "ant-design-vue";

export default (app:App) => {
    app.use(Icon)
    app.use(ConfigProvider)
    app.use(Button)
    app.use(Image)
    app.use(Layout)
    app.use(Typography)
    app.use(Row)
    app.use(Col)
    app.use(Space)
    app.use(Switch)
    app.use(Avatar)
    app.use(Popconfirm)
    app.use(Popover)
}