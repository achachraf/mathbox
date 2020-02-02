--
-- PostgreSQL database dump
--

-- Dumped from database version 10.11 (Ubuntu 10.11-1.pgdg18.04+1)
-- Dumped by pg_dump version 10.11 (Ubuntu 10.11-1.pgdg18.04+1)

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

SET default_with_oids = false;

--
-- Name: field; Type: TABLE; Schema: public; Owner: achraf
--

CREATE TABLE public.field (
    field_id integer NOT NULL,
    field_name text NOT NULL,
    field_description text
);


ALTER TABLE public.field OWNER TO achraf;

--
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
-- Name: tools; Type: TABLE; Schema: public; Owner: achraf
--

CREATE TABLE public.tools (
    tool_id integer NOT NULL,
    tool_name text NOT NULL,
    field_id integer NOT NULL
);


ALTER TABLE public.tools OWNER TO achraf;

--
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
-- Name: types; Type: TABLE; Schema: public; Owner: achraf
--

CREATE TABLE public.types (
    type_id integer NOT NULL,
    type_name text NOT NULL
);


ALTER TABLE public.types OWNER TO achraf;

--
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
-- Name: users; Type: TABLE; Schema: public; Owner: achraf
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username text NOT NULL,
    password text,
    email text,
    creation_date timestamp without time zone
);


ALTER TABLE public.users OWNER TO achraf;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: achraf
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: tools UNIQUE_NAME; Type: CONSTRAINT; Schema: public; Owner: achraf
--

ALTER TABLE ONLY public.tools
    ADD CONSTRAINT "UNIQUE_NAME" UNIQUE (tool_name);


--
-- Name: field field_pkey; Type: CONSTRAINT; Schema: public; Owner: achraf
--

ALTER TABLE ONLY public.field
    ADD CONSTRAINT field_pkey PRIMARY KEY (field_id);


--
-- Name: input input_pkey; Type: CONSTRAINT; Schema: public; Owner: achraf
--

ALTER TABLE ONLY public.input
    ADD CONSTRAINT input_pkey PRIMARY KEY (input_id);


--
-- Name: tools tools_pkey; Type: CONSTRAINT; Schema: public; Owner: achraf
--

ALTER TABLE ONLY public.tools
    ADD CONSTRAINT tools_pkey PRIMARY KEY (tool_id);


--
-- Name: types types_pkey; Type: CONSTRAINT; Schema: public; Owner: achraf
--

ALTER TABLE ONLY public.types
    ADD CONSTRAINT types_pkey PRIMARY KEY (type_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: achraf
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: tools FK_FIELD; Type: FK CONSTRAINT; Schema: public; Owner: achraf
--

ALTER TABLE ONLY public.tools
    ADD CONSTRAINT "FK_FIELD" FOREIGN KEY (field_id) REFERENCES public.field(field_id);


--
-- Name: input FK_TOOL; Type: FK CONSTRAINT; Schema: public; Owner: achraf
--

ALTER TABLE ONLY public.input
    ADD CONSTRAINT "FK_TOOL" FOREIGN KEY (tool_id) REFERENCES public.tools(tool_id);


--
-- PostgreSQL database dump complete
--

