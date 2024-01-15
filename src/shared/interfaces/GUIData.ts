
// *Menu interfaces
export interface IButton extends TextButton{
    UIAspectRatioConstraint: UIAspectRatioConstraint,
    UICorner: UICorner,
    UIStroke: UIStroke,
    UITextSizeConstraint: UITextSizeConstraint
}

export interface ISubMenu extends Frame{
    //хз
}

export interface IMenu extends Frame{
    UIAspectRatioConstraint: UIAspectRatioConstraint,
    UICorner: UICorner,
    SubMenu: ISubMenu,
}
// *Menu interfaces

// *Shop interfaces

export interface IBuyButton extends TextButton{
    UIAspectRatioConstraint: UIAspectRatioConstraint,
    UICorner: UICorner,
    UIStroke: UIStroke,
    UITextSizeConstraint: UITextSizeConstraint
}

export interface ICard extends Frame{
    UICorner: UICorner,
    Button: IBuyButton
}

export interface ICards extends Frame{
    UICorner:UICorner,
    UIGridLayout: UIGridLayout,
    UIPadding: UIPadding,
    //! Card: ...
}

export interface IShop extends Frame{
    UIAspectRatioConstraint: UIAspectRatioConstraint,
    UICorner: UICorner,
    Cards: ICards
}
// *Shop interfaces

// *Global interface
export interface IGUIData extends ScreenGui {
    Menu: IMenu,
    MenuBtn: IButton
    Shop: IShop
    ShopBtn: IButton
}
// *Global interface