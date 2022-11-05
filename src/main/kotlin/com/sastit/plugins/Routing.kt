package com.sastit.plugins

import io.ktor.server.application.Application
import io.ktor.server.application.call
import io.ktor.server.response.respondText
import io.ktor.server.routing.get
import io.ktor.server.routing.routing
import java.util.Random

fun Application.configureRouting() {

  routing {
    get("/") {
      call.respondText("Hello World!")
    }

    get("/get-award") {
      val i = Random().nextInt(container.size)
      val text = container[i]
      container.removeAt(i)
      call.respondText(text)
    }
  }
}
