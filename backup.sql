--
-- PostgreSQL database dump
--

-- Dumped from database version 15.5
-- Dumped by pg_dump version 15.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: administrateurs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.administrateurs (
    id text NOT NULL,
    mail text NOT NULL,
    login text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.administrateurs OWNER TO postgres;

--
-- Name: cours; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cours (
    id text NOT NULL,
    nom text NOT NULL,
    "dateDebut" timestamp(3) without time zone NOT NULL,
    "dateFin" timestamp(3) without time zone NOT NULL,
    "intervenantId" text NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    salle text NOT NULL,
    "promotionId" text NOT NULL
);


ALTER TABLE public.cours OWNER TO postgres;

--
-- Name: etudiants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.etudiants (
    id text NOT NULL,
    nom text NOT NULL,
    prenom text NOT NULL,
    "promotionId" text NOT NULL
);


ALTER TABLE public.etudiants OWNER TO postgres;

--
-- Name: inscriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inscriptions (
    "coursId" text NOT NULL,
    "etudiantId" text NOT NULL
);


ALTER TABLE public.inscriptions OWNER TO postgres;

--
-- Name: intervenants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.intervenants (
    id text NOT NULL,
    nom text NOT NULL,
    prenom text NOT NULL,
    mail text NOT NULL,
    login text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.intervenants OWNER TO postgres;

--
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    id text NOT NULL,
    content text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- Name: promotions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.promotions (
    id text NOT NULL,
    nom text NOT NULL,
    abreviation text NOT NULL
);


ALTER TABLE public.promotions OWNER TO postgres;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
2179071e-b1fc-4ae9-95a2-96f18a2f8943	112d5f9d2737dcb7650736b5f16346530b409c174ca9e583bdbdf5f2938c0904	2024-03-25 13:13:44.137924+00	20240325131331_init_db	\N	\N	2024-03-25 13:13:44.082045+00	1
\.


--
-- Data for Name: administrateurs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.administrateurs (id, mail, login, password) FROM stdin;
\.


--
-- Data for Name: cours; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cours (id, nom, "dateDebut", "dateFin", "intervenantId", "updatedAt", salle, "promotionId") FROM stdin;
\.


--
-- Data for Name: etudiants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.etudiants (id, nom, prenom, "promotionId") FROM stdin;
\.


--
-- Data for Name: inscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inscriptions ("coursId", "etudiantId") FROM stdin;
\.


--
-- Data for Name: intervenants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.intervenants (id, nom, prenom, mail, login, password) FROM stdin;
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts (id, content, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: promotions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.promotions (id, nom, abreviation) FROM stdin;
clu6yyh1o0000wa43ux5ernhl	LICENCE 1	L1
clu6yyh1y0001wa433oxqc2mq	LICENCE 2	L2
clu6yyh230002wa43ux4y5ab4	LICENCE 3	L3
clu6yyh270003wa43277hynd9	MASTER 1	M1
clu6yyh2e0004wa43n6qfzmi9	MASTER 2	M2
\.


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: administrateurs administrateurs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.administrateurs
    ADD CONSTRAINT administrateurs_pkey PRIMARY KEY (id);


--
-- Name: cours cours_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cours
    ADD CONSTRAINT cours_pkey PRIMARY KEY (id);


--
-- Name: etudiants etudiants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.etudiants
    ADD CONSTRAINT etudiants_pkey PRIMARY KEY (id);


--
-- Name: inscriptions inscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inscriptions
    ADD CONSTRAINT inscriptions_pkey PRIMARY KEY ("coursId", "etudiantId");


--
-- Name: intervenants intervenants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.intervenants
    ADD CONSTRAINT intervenants_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: promotions promotions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promotions
    ADD CONSTRAINT promotions_pkey PRIMARY KEY (id);


--
-- Name: posts_createdAt_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "posts_createdAt_idx" ON public.posts USING btree ("createdAt");


--
-- Name: promotions_abreviation_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX promotions_abreviation_key ON public.promotions USING btree (abreviation);


--
-- Name: promotions_nom_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX promotions_nom_key ON public.promotions USING btree (nom);


--
-- Name: cours cours_intervenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cours
    ADD CONSTRAINT "cours_intervenantId_fkey" FOREIGN KEY ("intervenantId") REFERENCES public.intervenants(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: cours cours_promotionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cours
    ADD CONSTRAINT "cours_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES public.promotions(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: etudiants etudiants_promotionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.etudiants
    ADD CONSTRAINT "etudiants_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES public.promotions(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: inscriptions inscriptions_coursId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inscriptions
    ADD CONSTRAINT "inscriptions_coursId_fkey" FOREIGN KEY ("coursId") REFERENCES public.cours(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: inscriptions inscriptions_etudiantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inscriptions
    ADD CONSTRAINT "inscriptions_etudiantId_fkey" FOREIGN KEY ("etudiantId") REFERENCES public.etudiants(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

