var Color = require("color")

var primary = Color("rgba(0,0,0,0.8)");
var secondary = Color("#252932");
var sidebar = Color("#384850");
var dark = Color("rgba(0,0,0,0.8)");
var light = Color("rgba(255,255,255,0.8)");

var darken = primary.darken(0.2).hexString().toString();

module.exports = {
	brandPrimary : primary.hexString().toString(),
	darker: darken,
	brandSecondary: secondary.hexString().toString(),
	brandSidebar: sidebar.hexString().toString(),
	dark: dark.hexString().toString(),
	light: light.hexString().toString()
}
