import { Component } from "react";

export default class BaseComponent<T = {}> extends Component<T> {

    currentDate: Date = new Date()

}
