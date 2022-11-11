package com.sastit

import com.sastit.plugins.configureSerialization
import com.sastit.plugins.configureRouting
import com.sastit.plugins.configureSockets
import io.ktor.server.application.Application
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty

fun main() {
  embeddedServer(Netty, port = 8080, host = "0.0.0.0", module = Application::module)
    .start(wait = true)
}

fun Application.module() {
  configureSockets()
  configureRouting()
  configureSerialization()
}
