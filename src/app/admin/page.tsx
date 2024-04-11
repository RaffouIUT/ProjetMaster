'use client';
import InterTabPane from '@/components/interTabPane';
import React, { useEffect, useState } from 'react';
import { InterReduit } from '@/components/utils/customTypes';
import { getAllInter } from '@/components/utils/interUtils';
import { Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import NavBarAdmin from '@/components/navBarAdmin';
import StudentTabPane from '@/components/studentTabPane';
import { Promotion } from '@prisma/client';
import { getAllPromo } from '@/components/utils/promotionUtils';
import PromoTabPane from '@/components/promoTabPane';
import Cookies from "js-cookie";
import {fonctionRedirectHome, verifCookieAdmin} from "@/components/utils/connexionUtils";

export default function Page() {


    const [intervenants, setIntervenants] = useState<InterReduit[]>([]);

    const [actualizeInters, setActualizeInters] = useState<boolean>(false);

    const [activeTab, setActiveTab] = useState<string>("1");

    const [promos, setPromos] = useState<Promotion[]>([]);

    const [actualizePromos, setActualizePromos] = useState<boolean>(false);

    const refreshPromos = () => setActualizePromos(!actualizePromos);

    const refreshInters = () => setActualizeInters(!actualizeInters);

    useEffect(() => {
        getAllInter().then((inters) => setIntervenants(inters));
    }, [actualizeInters]);

    useEffect(() => {
        getAllPromo().then((promotions) => setPromos(promotions));
    }, [actualizePromos]);

    useEffect(() => {
        const cookie = Cookies.get('authAdmin');
        if(cookie === undefined) {
            alert('Erreur lors de la récupération du cookie');
            return
        }else{
            verifCookieAdmin(cookie).then((response) => {if(!response) {
                Cookies.set('authAdmin', 'false');
                fonctionRedirectHome().then();
            }});
        }
    }, []);


    return (<>
        <section className="flex flex-column min-h-screen">
            <NavBarAdmin/>
            <div className={"p-3"}>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={activeTab == '1' ? "active" : ""}
                            onClick={() => setActiveTab('1')}>
                            Intervenants
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={activeTab == '2' ? "active" : ""}
                            onClick={() => setActiveTab('2')}>
                            Promotions
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={activeTab == '3' ? "active" : ""}
                            onClick={() => setActiveTab('3')}>
                            Etudiants
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Row className={"p-3"}>
                            <InterTabPane inters={intervenants} refreshInters={refreshInters}/>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row className={"p-3"}>
                            <PromoTabPane promos={promos} refreshPromos={refreshPromos}/>
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        <Row className={"p-3"}>
                            <StudentTabPane promos={promos}/>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        </section>
    </>);
};
