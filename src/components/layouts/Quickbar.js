import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import { findDOMNode } from 'react-dom';
import { Tab, Nav } from 'react-bootstrap';
import Todolist from './Quickbar/Todolist';
import Reminder from './Quickbar/Reminder';
import Notes from './Quickbar/Notes';
import Invitemembers from './Quickbar/Invite';
import Settings from './Quickbar/Settings';

const todotip = (
    <Tooltip>
        Launch To-do-list
    </Tooltip>
);
const reminderstip = (
    <Tooltip>
        Launch Reminders
    </Tooltip>
);
const notestip = (
    <Tooltip>
        Launch Notes
    </Tooltip>
);
const memberstip = (
    <Tooltip>
        Invite Members
    </Tooltip>
);
const settingstip = (
    <Tooltip>
        Settings
    </Tooltip>
);
const hammertip = (
    <Tooltip>
        Configure Quick Access
    </Tooltip>
);

class Quickbar extends Component {
    // Quickbar btn
    quickbarbtn = () => {
        const qbb = findDOMNode(this.refs.quickbarbtn);
        const qbtext = findDOMNode(this.refs.quickbartext);
        $(qbb).addClass('ms-quick-bar-open');
        $(qbtext).text($(this).data('title'));
    }
    removequickbarbtn = () => {
        const qbb = findDOMNode(this.refs.quickbarbtn);
        $(qbb).removeClass('ms-quick-bar-open');
    }
    // Ms configure
    msconfigurebtn = () => {
        const amsc = findDOMNode(this.refs.addmsconfigure);
        const rqt = findDOMNode(this.refs.removequicktab);
        const rqt1 = findDOMNode(this.refs.removequicktab1);
        const rqt2 = findDOMNode(this.refs.removequicktab2);
        const rqt3 = findDOMNode(this.refs.removequicktab3);
        const rqt4 = findDOMNode(this.refs.removequicktab4);
        const rqtc = findDOMNode(this.refs.removequicktabcontent);
        const qbb = findDOMNode(this.refs.quickbarbtn);
        $(amsc).toggleClass('ms-qa-configure-mode');
        $(rqt).removeClass('active').removeAttr('data-rb-event-key');
        $(rqt1).removeClass('active').removeAttr('data-rb-event-key');
        $(rqt2).removeClass('active').removeAttr('data-rb-event-key');
        $(rqt3).removeClass('active').removeAttr('data-rb-event-key');
        $(rqt4).removeClass('active').removeAttr('data-rb-event-key');
        $(rqtc).removeClass('active show');
        $(qbb).removeClass('ms-quick-bar-open');
    }
    componentDidMount() {
        this.$node = $(this.refs.addmsconfigure);
        this.$node.sortable({
            opacity: this.props.opacity,
        });
    }
    shouldComponentUpdate() {
        return false;
    }
    constructor(props) {
        super(props);
        this.state = { isEnabled: true };
    }
    handleOnChange(event, ui) {
        console.log('DOM changed!', event, ui);
    }
    render() {
        return (
            <aside id="ms-quick-bar" className="ms-quick-bar fixed ms-d-block-lg" ref="quickbarbtn">
                
            </aside>


        );
    }
}

export default Quickbar;