--
-- PostgreSQL database dump
--

-- Dumped from database version 10.11 (Ubuntu 10.11-1.pgdg18.04+1)
-- Dumped by pg_dump version 12.1 (Ubuntu 12.1-1.pgdg18.04+1)

-- Started on 2020-02-03 14:03:25 +01

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

SET default_tablespace = '';

--
-- TOC entry 199 (class 1259 OID 24655)
-- Name: field; Type: TABLE; Schema: public; Owner: achraf
--

CREATE TABLE public.field (
    field_id integer NOT NULL,
    field_name text NOT NULL,
    field_description text
);


ALTER TABLE public.field OWNER TO achraf;

--
-- TOC entry 198 (class 1259 OID 24653)
-- Name: field_id_seq; Type: SEQUENCE; Schema: public; Owner: achraf
--

ALTER TABLE public.field ALTER COLUMN field_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.field_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 203 (class 1259 OID 24680)
-- Name: input; Type: TABLE; Schema: public; Owner: achraf
--

CREATE TABLE public.input (
    input_id integer NOT NULL,
    tool_id integer NOT NULL,
    input_order integer DEFAULT 1 NOT NULL,
    input_type text
);


ALTER TABLE public.input OWNER TO achraf;

--
-- TOC entry 202 (class 1259 OID 24678)
-- Name: input_id_seq; Type: SEQUENCE; Schema: public; Owner: achraf
--

ALTER TABLE public.input ALTER COLUMN input_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.input_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 201 (class 1259 OID 24665)
-- Name: tools; Type: TABLE; Schema: public; Owner: achraf
--

CREATE TABLE public.tools (
    tool_id integer NOT NULL,
    tool_name text NOT NULL,
    field_id integer NOT NULL,
    creation_date timestamp without time zone DEFAULT now() NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.tools OWNER TO achraf;

--
-- TOC entry 200 (class 1259 OID 24663)
-- Name: tools_id_seq; Type: SEQUENCE; Schema: public; Owner: achraf
--

ALTER TABLE public.tools ALTER COLUMN tool_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tools_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 204 (class 1259 OID 24690)
-- Name: types; Type: TABLE; Schema: public; Owner: achraf
--

CREATE TABLE public.types (
    type_id integer NOT NULL,
    type_name text NOT NULL
);


ALTER TABLE public.types OWNER TO achraf;

--
-- TOC entry 205 (class 1259 OID 24705)
-- Name: types_id_seq; Type: SEQUENCE; Schema: public; Owner: achraf
--

ALTER TABLE public.types ALTER COLUMN type_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 197 (class 1259 OID 16438)
-- Name: users; Type: TABLE; Schema: public; Owner: achraf
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username text NOT NULL,
    password text,
    email text,
    creation_date timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO achraf;

--
-- TOC entry 196 (class 1259 OID 16436)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: achraf
--

ALTER TABLE public.users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 2957 (class 0 OID 24655)
-- Dependencies: 199
-- Data for Name: field; Type: TABLE DATA; Schema: public; Owner: achraf
--

COPY public.field (field_id, field_name, field_description) FROM stdin;
1	number-theory	this is the number theory field
2	Calculus	this field is about calculus
3	Graphs-theory	this field is about grap theory
4	Basics	this field is about basics
\.


--
-- TOC entry 2961 (class 0 OID 24680)
-- Dependencies: 203
-- Data for Name: input; Type: TABLE DATA; Schema: public; Owner: achraf
--

COPY public.input (input_id, tool_id, input_order, input_type) FROM stdin;
1	1	1	integer
2	1	2	integer
3	10	1	integer
5	14	1	integer
6	15	1	integer
7	15	2	integer
8	16	1	integer
9	17	1	integer
10	17	2	integer
11	18	1	integer
12	19	1	integer
\.


--
-- TOC entry 2959 (class 0 OID 24665)
-- Dependencies: 201
-- Data for Name: tools; Type: TABLE DATA; Schema: public; Owner: achraf
--

COPY public.tools (tool_id, tool_name, field_id, creation_date, user_id) FROM stdin;
1	gcd	1	2020-01-20 16:00:41.292833	4
10	test1	1	2020-02-02 20:41:41.292833	4
14	test2	1	2020-02-02 23:59:01.555548	4
15	test3	1	2020-02-03 01:31:17.708958	4
16	Square-root	4	2020-02-03 13:35:24.293264	4
17	power	4	2020-02-03 13:41:42.118362	4
18	Prime-Factors	1	2020-02-03 13:43:30.323483	4
19	Prime-Factorization	1	2020-02-03 13:44:25.081973	4
\.


--
-- TOC entry 2962 (class 0 OID 24690)
-- Dependencies: 204
-- Data for Name: types; Type: TABLE DATA; Schema: public; Owner: achraf
--

COPY public.types (type_id, type_name) FROM stdin;
1	int
\.


--
-- TOC entry 2955 (class 0 OID 16438)
-- Dependencies: 197
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: achraf
--

COPY public.users (user_id, username, password, email, creation_date) FROM stdin;
4	achraf	$2y$12$DTE7zE4lQZVeVW9nXACMseKFk2NiN38g9vhTfN2Ek8B.P2e4D2tu.	achrafachkari@hotmail.fr	2020-02-02 20:15:34.911873
9	hamid	$2a$10$jM8Ud9LPll5dEhHI0TfD3eKxfCVwNTZ/LlwNm83op/3y47RTiwAa.	hamid@battery.org	2020-02-03 00:22:11.287062
\.


--
-- TOC entry 2969 (class 0 OID 0)
-- Dependencies: 198
-- Name: field_id_seq; Type: SEQUENCE SET; Schema: public; Owner: achraf
--

SELECT pg_catalog.setval('public.field_id_seq', 4, true);


--
-- TOC entry 2970 (class 0 OID 0)
-- Dependencies: 202
-- Name: input_id_seq; Type: SEQUENCE SET; Schema: public; Owner: achraf
--

SELECT pg_catalog.setval('public.input_id_seq', 12, true);


--
-- TOC entry 2971 (class 0 OID 0)
-- Dependencies: 200
-- Name: tools_id_seq; Type: SEQUENCE SET; Schema: public; Owner: achraf
--

SELECT pg_catalog.setval('public.tools_id_seq', 19, true);


--
-- TOC entry 2972 (class 0 OID 0)
-- Dependencies: 205
-- Name: types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: achraf
--

SELECT pg_catalog.setval('public.types_id_seq', 1, true);


--
-- TOC entry 2973 (class 0 OID 0)
-- Dependencies: 196
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: achraf
--

SELECT pg_catalog.setval('public.users_id_seq', 9, true);


--
-- TOC entry 2823 (class 2606 OID 24704)
-- Name: tools UNIQUE_NAME; Type: CONSTRAINT; Schema: public; Owner: achraf
--

ALTER TABLE ONLY public.tools
    ADD CONSTRAINT "UNIQUE_NAME" UNIQUE (tool_name);


--
-- TOC entry 2821 (class 2606 OID 24662)
-- Name: field field_pkey; Type: CONSTRAINT; Schema: public; Owner: achraf
--

ALTER TABLE ONLY public.field
    ADD CONSTRAINT field_pkey PRIMARY KEY (field_id);


--
-- TOC entry 2827 (class 2606 OID 24684)
-- Name: input input_pkey; Type: CONSTRAINT; Schema: public; Owner: achraf
--

ALTER TABLE ONLY public.input
    ADD CONSTRAINT input_pkey PRIMARY KEY (input_id);


--
-- TOC entry 2825 (class 2606 OID 24672)
-- Name: tools tools_pkey; Type: CONSTRAINT; Schema: public; Owner: achraf
--

ALTER TABLE ONLY public.tools
    ADD CONSTRAINT tools_pkey PRIMARY KEY (tool_id);


--
-- TOC entry 2829 (class 2606 OID 24697)
-- Name: types types_pkey; Type: CONSTRAINT; Schema: public; Owner: achraf
--

ALTER TABLE ONLY public.types
    ADD CONSTRAINT types_pkey PRIMARY KEY (type_id);


--
-- TOC entry 2819 (class 2606 OID 16442)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: achraf
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 2830 (class 2606 OID 24673)
-- Name: tools FK_FIELD; Type: FK CONSTRAINT; Schema: public; Owner: achraf
--

ALTER TABLE ONLY public.tools
    ADD CONSTRAINT "FK_FIELD" FOREIGN KEY (field_id) REFERENCES public.field(field_id);


--
-- TOC entry 2832 (class 2606 OID 24685)
-- Name: input FK_TOOL; Type: FK CONSTRAINT; Schema: public; Owner: achraf
--

ALTER TABLE ONLY public.input
    ADD CONSTRAINT "FK_TOOL" FOREIGN KEY (tool_id) REFERENCES public.tools(tool_id);


--
-- TOC entry 2831 (class 2606 OID 24739)
-- Name: tools FK_USER_ID; Type: FK CONSTRAINT; Schema: public; Owner: achraf
--

ALTER TABLE ONLY public.tools
    ADD CONSTRAINT "FK_USER_ID" FOREIGN KEY (user_id) REFERENCES public.users(user_id) NOT VALID;


-- Completed on 2020-02-03 14:03:26 +01

--
-- PostgreSQL database dump complete
--

